package controllers

import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.impl.providers._

import javax.inject.Inject
import play.api.mvc.{Action, AnyContent, Cookie, DiscardingCookie, Request}
import play.filters.csrf.CSRF.Token
import play.filters.csrf.{CSRF, CSRFAddToken}
import play.api.mvc.Cookie.SameSite

import scala.concurrent.{ExecutionContext, Future}

class AuthenticationController @Inject()(scc: DefaultSilhouetteControllerComponents, addToken: CSRFAddToken)(implicit ex: ExecutionContext) extends SilhouetteController(scc)  {

  def authenticate(provider: String): Action[AnyContent] = addToken(Action.async { implicit request: Request[AnyContent] =>
    (socialProviderRegistry.get[SocialProvider](provider) match {
      case Some(p: SocialProvider with CommonSocialProfileBuilder) =>
        p.authenticate().flatMap {
          case Left(result) => Future.successful(result)
          case Right(authInfo) => for {
            profile <- p.retrieveProfile(authInfo)
            _ <- userRepository.add(profile.email.getOrElse(""), profile.loginInfo.providerID, profile.loginInfo.providerKey)
            _ <- authInfoRepository.save(profile.loginInfo, authInfo)
            authenticator <- authenticatorService.create(profile.loginInfo)
            value <- authenticatorService.init(authenticator)
            token = CSRF.getToken.get
            result <- authenticatorService.embed(value, Redirect(s"https://ebusiness-frontend.azurewebsites.net/post-auth?csrfToken=${token.value}"))
          } yield {
            val cookie = Cookie(token.name, token.value, httpOnly = false, secure = true, sameSite = Option.apply(SameSite.None))
            result.withCookies(cookie)
          }
        }
      case _ => Future.failed(new ProviderException(s"Cannot authenticate with unexpected social provider $provider"))
    }).recover {
      case _: ProviderException =>
        Forbidden("Forbidden")
    }
  })

  def logOut: Action[AnyContent] = securedAction.async { implicit request: SecuredRequest[EnvType, AnyContent] =>
    authenticatorService.discard(request.authenticator, Ok("Logged out successful"))
      .map(_.discardingCookies(
        new DiscardingCookie(name = "csrfToken", secure = true) {
          override def toCookie: Cookie = Cookie(name, "", Some(Cookie.DiscardedMaxAge), path, domain, secure, false, Option.apply(SameSite.None))},
        new DiscardingCookie(name = "PLAY_SESSION", secure = true) {
          override def toCookie: Cookie = Cookie(name, "", Some(Cookie.DiscardedMaxAge), path, domain, secure, false, Option.apply(SameSite.None))},
        new DiscardingCookie(name = "OAuth2State", secure = true) {
          override def toCookie: Cookie = Cookie(name, "", Some(Cookie.DiscardedMaxAge), path, domain, secure, false, Option.apply(SameSite.None))},
        new DiscardingCookie(name = "authenticator", secure = true) {
          override def toCookie: Cookie = Cookie(name, "", Some(Cookie.DiscardedMaxAge), path, domain, secure, false, Option.apply(SameSite.None))}
      ))
  }

}
