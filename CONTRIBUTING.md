# Contributor guide

## Creating issues

- Any team member can, and should, create issues to prioritize and track the work.
- Check if the card already exists on the board.
- Card Title: Noun + verb/action
- Tags: use the existing ones. Don't create tags. Talk with the team first!
- New cards should remain in the Backlog and prioritized with the product owner

## Refining cards

- T-shirt sizing for new cards as a way to facilitate preliminary review / prioritization by PO
- Estimating/Reviewing cards async before refinement/sprint planning
- Backlog refinement/sprint planning meetings should happen before the end of the current sprint
- Card should pass Definition of Ready (DoR) before it can be moved as a sprint candidate
- Use planning-poker/estimation tool: [PlanIt Poker](https://app.planitpoker.com)

## Git Workflow

### Creating a Pull Request

- Branch new features off the `develop` branch.
- Branch naming policy is as follows: [issue#]-brief-description. 
  In the event that an issue does not already exist for the changes being made in a branch, one should be made.
- Make draft pull requests early and often to facilitate a transparent process.
- When a PR is ready, post a request for review with a link to the branch in Teams.
- Reviews can be done by the first person who gets to it.
  If the code needs explaining, request the author to walk you through it.
- Follow peer review best practices by suggesting opportunities to improve code during peer review,
  merging as soon as the code is better than the code in the target branch and release ready.
- Treat any opportunity for improvement feedback identified during peer review but not implemented in the PR 
  where it was raised as technical debt worthy of a new issue referencing the PR where the comments first came up.
- When necessary, use git rebase to sync a feature branch with `develop` branch.
  This keeps a tidier history in git, however, can be destructive, so do cautiously.

### Merging your code into develop.

- GitHub will not let you merge code that has not passed the following checks
  - The pipeline builds correctly
  - Another developer has performed a code review, and you have implemented requested changes
  - Your branch is not behind develop in terms of commits.  If it is, pull the changes into your branch and resolve 
  - any merge conflicts.
- Once these conditions are met GitHub will allow you to merge in your code.
- After the merge is complete, be sure to delete the feature branch so that it doesn't clutter the Github branch list.

### Deploying to test and prod

- Automatic deploy = deployments to test happens when merging to develop, make a PR from feature-branch → develop.
- Manual deployments to prod will be triggered by the repos admin, after being reviewed and approved.

## Commit Message Guidelines

Similar to [Angular's guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines), we follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format for our commit messages. 
This leads to more readable messages that are easy to follow when looking through the project history. 
We use the git commit messages to generate the change log upon releasing.

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
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc)
- **test**: Adding missing tests or correcting existing tests
- **chore**: Any other type of change

### Breaking changes

If the change is a breaking change, add a `!` after the type, e.g. `feat!`. 
A breaking change is any change that would require manual intervention from a team member 
or a user to ensure business continuity.

### Scope

To make it easier for the reader to identify the scope of the change, you _may_ indicate a scope in your commit message.
If a change affects multiple scopes, do not provide a scope in your commit message.
The following scopes may be used:

- **front-end**: for changes that affect only the front-end code
- **server**: for changes that affect the server code
- **db**: for changes that affect the database code
- **devops**: for changes that affect the deployment configurations, such as the helm charts or terraform config
- **deps**: for changes that affect the application's dependencies
