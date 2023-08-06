async function fetchContributorData() {
  try {
    const response = await fetch('https://api.github.com/repos/Spyware007/Animating-Buttons/contributors');
    const data = await response.json();
    
    const contributorData = data.map(item => ({
      head: item.login,
      imageUrl: item.avatar_url,
      githubacc: item.html_url,
    }));

    return contributorData;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error);
    throw error;
  }
}

export default fetchContributorData;
