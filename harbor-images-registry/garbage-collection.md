# Deleting Repositories
The Adminstrators have the privilege to delete repositories. Repository deletion runs in two steps:
1. Delete a repository in Harbor's UI. You can delete the entire repository or just a tag of it. This is soft deletion. After this, the repository is no longer managed in Harbor, however, the files of the repository still remain in Harbor's storage.
2. Delete the actual files of the repository using the `garbage collection` in Harbor's UI. 