package models

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.lifted.TableQuery

import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

class UserLogsRepository @Inject()(databaseConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext)
  extends IdentityService[UserEntry]{

  private val databaseConfig = databaseConfigProvider.get[JdbcProfile]
  private val userLogs = TableQuery[UserLogsTable]

  import databaseConfig._
  import databaseConfig.profile.api._

  def add(email: String, providerId: String, providerKey: String): Future[Try[UserLog]] = db.run {
    ((userLogs returning userLogs.map(_.id) into (
      (userLog, id) => userLog.copy(id = id)
      )) += UserLog(0, email,
      providerId,
      providerKey)).asTry
  }

  override def retrieve(loginInfo: LoginInfo): Future[Option[UserEntry]] = db.run {
    userLogs.filter(_.providerId === loginInfo.providerID)
      .filter(_.providerKey === loginInfo.providerKey)
      .result
      .headOption
  }.map(_.map(dto => toModel(dto)))

  private def toModel(dto: UserLog): UserEntry =
    UserEntry(dto.id, LoginInfo(dto.providerId, dto.providerKey), dto.email)
}
