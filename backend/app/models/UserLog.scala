package models

import play.api.libs.json.{Json, OFormat}
import slick.jdbc.SQLiteProfile.api._

case class UserLog(id: Long, email: String, providerId: String, providerKey: String)

object UserLog {
  implicit val userFormat: OFormat[UserLog] = Json.format[UserLog]
}

class UserLogsTable(tag: Tag) extends Table[UserLog](tag, "UserLogs") {

  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def email = column[String]("email")
  def providerId = column[String]("providerId")
  def providerKey = column[String]("providerKey")

  def * = (id, email, providerId, providerKey) <> ((UserLog.apply _).tupled, UserLog.unapply)

}
