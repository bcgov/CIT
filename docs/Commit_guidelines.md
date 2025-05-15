## Commit Message Guidelines

Similar to [Angular's guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines), we follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format for our commit messages. This leads to more readable messages that are easy to follow when looking through the project history. We use the git commit messages to generate the change log upon releasing.

The commit message header must be formatted as follows:

`<type>[(optional scope)]: <description>`

### Type

Must be one of the following:

- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation-only changes
- **feat**: A new feature, either user-facing or in the backend
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **chore**: Any other type of change

### Breaking changes

If the change is a breaking change, add a `!` after the type, e.g. `feat!`. A breaking change is any change that would require manual intervention from a team member or a user to ensure business continuity.

### Scope

To make it easier for the reader to identify the scope of the change, you _may_ indicate a scope in your commit message.
If a change affects multiple scopes, do not provide a scope in your commit message.
The following scopes may be used:

- **front-end**: for changes that affect only the front-end code
- **api**: for changes that affect the api code
- **devops**: for changes that affect the deployment configurations, such as the helm charts or terraform config
- **deps**: for changes that affect the application's dependencies
