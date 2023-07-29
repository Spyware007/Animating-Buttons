## Contributing Guidelines 🤝

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-yellow.svg?style=flat-square)](http://makeapullrequest.com)
&nbsp;
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/red?icon=github)](https://github.com/Naereen/badges/)

We are happy to welcome all the contributions from anyone willing to improve/add new ideas to this project.
This documentation contains a set of guidelines to help you during the contribution process. We are happy to welcome all contributions from anyone willing to improve/add new ideas to this project.
Thank you for helping out, and remember, **no contribution is too small**. Being an open-source contributor doesn't just mean writing code either. You can help out by writing documentation, tests, or even giving suggestions. 🏆

</br>

Note: All PRs to this repo must be made only to the `develop` branch (`main` is used only for deployment).

### 1. Issues 🐛

- Always check the existing issues and **do not create an issue if it already exists**, or create your own issue.
- Only start working on an issue if it has been assigned to you. Check assignees.
- Every change in this project should/must have an associated issue. Issue before PR.
- Do not have multiple PRs for the same issue. One PR per issue.
- Assignees should make a PR in a time-bound manner (possibly 1-2 weeks); otherwise, it may be unassigned.
- If a PR closes the issue, link it to the issue.
- If a change is requested, link the commit to the issue.

### 2. Fork the Project and Set Up Locally (Optional) 🍴

- Fork this repository. This will create a local copy of this repository on your GitHub profile. Keep a reference to the original project in the `upstream` remote.

- Clone the repository using the following command in your terminal:

```bash
git clone https://github.com/<your-username>/<repo-name>
cd <repo-name>
git remote add upstream https://github.com/<upstream-owner>/<repo-name>
```

- If you have already forked the project, update your copy before working.

```bash
git remote update
git checkout <branch-name>
git rebase upstream/<branch-name>
```

### 3 : Branch Policy 🌿

### Create a new branch after setting up the project locally before making any changes, so as to avoid merge conflicts while making PRs.

Use its name to identify the issue your addressing.Feature , Bug Fix or Enhancement.

```bash
# It will create a new branch with name Branch_Name and switch to that branch you just created
git checkout -b branch_name
```

### 4 : Work on the issue assigned to you 📕

- Work on the issue(s) assigned to you.
- Add all the files/folders needed.
- After you've made changes or made your contribution to the project add changes to the branch you've just created by:

```bash
# To add all new files to branch Branch_Name
git add .

# To add only a few files to Branch_Name
git add <some files>
```

### 5 : Commit and Push your changes 📦

- To commit give a descriptive message for the convenience of reviewer by :

```bash
# This message get associated with all files you have changed
git commit -m "message"
```

-Push your code to Github:

```bash
# To push your work to your remote repository
git push -u origin Branch_Name
```

- **NOTE**: A PR should have only one commit. Multiple commits should be squashed. [Learn how to squash commits](https://www.internalpointers.com/post/squash-commits-into-one-git)

### 6 : Work Remotely 📡

```bash
# To push your work to your remote repository
git push -u origin Branch_Name
```

### 7 : Pull Request 🎣

- Go to your repository in browser and click on compare and pull requests.
  Then add a title and description to your pull request that explains your contribution.

### 8 : Review Phase 🔍

- 🎉🌟Congratulations! Sit and relax, you've made your contribution to js-dom-snippets project. Wait until the PR is reviewed and incorporate changes suggested by the community. After which the PR can be successfully merged.
  🎉🎊

### Note 📒

- Make sure to align your button centered horizontally as well as vertically.
- Don't forget to replace 'your_github_username' with GitHub Username.
- If you are adding more than one buttons then give proper names such as Spyware007_1,Spyware007_2, your_github_username_1 and so on for all the buttons.
- Make sure to add your button in the correct section.

- Stage your changes for commit.

```
git add .
```

- Commit your changes with a relevant message.

```
git commit -m "Relevant message"
```

- Then push your changes to your forked repository.

```
git push origin my-new-branch
```

- Finally, create a new pull request from your forked repository

- Wait for your PR review and merge approval!

- **Star this repository if you had fun contributing!**

- Then link your uploaded images to README.md files.

- Then wait for your PR to be merged.

- Hurray! You successfully made a contribution!

---
