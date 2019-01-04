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
![user role](https://github.com/Ankr-network/tee-research-and-development/blob/feature/swdev-92-harbor-images-registry/harbor-images-registry/png/5%20rbac.png) <br/>
Harbor manages images through projects. Users can be added into one project as a member with three different roles:

* **Guest**: has read-only privilege for a specified project.
* **Developer**: has read and write privileges for a project.
* **ProjectAdmin**: When creating a new project, you will be assigned the "ProjectAdmin" role to the project. Besides read-write privileges, the "ProjectAdmin" also has some management privileges, such as adding and removing members, starting a vulnerability scan.

Besides the above three roles, there are two system-wide roles:
* **SysAdmin**: has the most privileges. In addition to the privileges mentioned above, "SysAdmin" can also list all projects, set an ordinary user as administrator, delete users and set vulnerability scan policy for all images. The public project "library" is also owned by the administrator.
* **Anonymous**: When a user is not logged in, the user is considered as an "Anonymous" user. An anonymous user has no access to private projects and has read-only access to public projects.

