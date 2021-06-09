import play.api.http.HttpErrorHandler
import play.api.http.Status.NOT_FOUND
import play.api.mvc.Results.Status
import play.api.mvc.{RequestHeader, Result}

import scala.concurrent.Future

class Errors extends HttpErrorHandler {
  def onClientError(request: RequestHeader, statusCode: Int, message: String): Future[Result] = {
    var errorMessage = "Unexpected error"
    if (statusCode == NOT_FOUND) {
      errorMessage = "Resource not found"
    }
    Future.successful(Status(statusCode)(errorMessage))
  }

  def onServerError(request: RequestHeader, exception: Throwable): Future[Result] = {
    Future.successful(Status(503)(exception.getMessage))
  }
}
