# Role-Based Access Control
More details about Access Control, please check the resource here:<br/> https://github.com/goharbor/harbor/blob/master/docs/user_guide.md#managing-user

## User Account
Harbor supports two authentication modes:
* Database(db_auth)
    * A user can register himself/herself in Harbor
    * User self-registration could be disabled
    * Username and email must be unique
    * Password could be reset
* LDAP/AD(Active Directory)(ldap_auth)
    * User credentials are stored in external LDAP/AD server
    * No self-registration
    * Could not delete user
    * Password could not be reset

## User Role
