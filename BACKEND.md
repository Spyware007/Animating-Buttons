# Contributing to Backend ✨🚀

Welcome to the Animating Buttons project! If you're interested in contributing to the backend of this project, you're in the right place. This guide will walk you through the process of setting up the backend environment and making contributions.

## Getting Started 💻

To get started with contributing to the frontend, follow these steps:

### First Steps-

1. Create **issue** in the Animating Buttons repository.
2. Once you are assigned the **issue**, move ahead with the following procedure-

### Fork, Clone, Navigate the Repository-

1. _Fork the Repository_ : Start by forking the Animating Buttons repository to your own GitHub account. (Click the [Fork](https://github.com/Spyware007/Animating-Buttons/fork) button in the top right corner of the page).

2. _Clone the Repository_ : Clone the forked repository to your local machine using the following command:

```bash
  git clone https://github.com/**username**/Animating-Buttons.git
```

3. _Navigate to project Directory_ : Move to the project directory using:

```bash
cd Animating-Buttons
```

4. _Install Dependencies_ : Install the necessary dependencies using npm:

```bash
npm i
npm start
```

5. _Create .env File_ : Create a .env file in the root directory of the project and populate it with the variables given in the environment variables section.

## Environment Variables 👨‍💻

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_apiKey`

`REACT_APP_authDomain`

`REACT_APP_projectId`

`REACT_APP_storageBucket`

`REACT_APP_messagingSenderId`

`REACT_APP_appId`

`REACT_APP_measurementId`

## Making Contributions 🤝

Now that you have the environment set up, you can start making contributions:

1. _Navigate to Backend Directory_ : Move to the backend directory of the project using:

```bash
cd Animating-Buttons
```

2. _Create a New Branch_ : Create a new branch for your feature or bug fix using a descriptive name:

```bash
  git checkout -b my-new-branch
```

3. _Optimize and Refactor_ : As the project backend utilizes Firebase, consider optimizing requests and improving the code structure. Explore the codebase to identify areas for improvement.

4. _Server Folder_ : If you're adding new files or refactoring code, consider placing them in the server folder for better organization.

5. _Add to Staging Area_ : Add the changes you made to the staging area of git by using:

```bash
# To check the state of the working directory and the staging area
git status

# To add all new files to branch my-new-branch
git add .

# To add only a few files to my-new-branch
git add <some files>
```

6. _Commit Changes_ : Commit your changes with a meaningful commit message:

```bash
git commit -m "Add description of your changes"
```

7. _Push Changes_ : Push your changes to your forked repository:

```bash
git push -u origin my-new-branch
```

- **NOTE**: A PR should have only one commit. Multiple commits should be squashed. [Learn how to squash commits](https://www.internalpointers.com/post/squash-commits-into-one-git)

8. _Create Pull Request_ :

   - Go to your repository in browser and click on compare and pull requests.
   - Then add a title and description to your pull request that explains your contribution.

9. To know more about how to contribute, read the [Countributing Guidelines](https://github.com/arcVaishali/Animating-Buttons/blob/main/CONTRIBUTING.md)

## Contact 📱

If you have any questions or need assistance, feel free to reach out to the project maintainers or contributors through GitHub's communication channels.

Thank you for your interest in contributing to Animating Buttons!
