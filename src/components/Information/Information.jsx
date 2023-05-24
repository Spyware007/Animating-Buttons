import React,{useState} from "react";
import { Diagram2, PeopleFill, StarFill } from "react-bootstrap-icons";
import { Octokit } from "octokit";
import './Information.css'

const Information = ({modeToggle}) => {

    
    const [forksCount, setForksCount] = useState(0);
    const [starsCount, setStarsCount] = useState(0);
    const[contributors, setContributors] = useState([]);

    const octokit = new Octokit({
        auth: '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'
      });
    
    const getRepoInfo = async (owner, repo) => {
    const {data} = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: owner,
        repo: repo
    });
    setForksCount(data.forks);
    setStarsCount(data.stargazers_count);
    fetch(data.contributors_url)
    .then(response => response.json())
    .then(contributors => setContributors(contributors))
    .catch(err => console.log(err, "Error fetching contributors"))
    }
    
    getRepoInfo('Spyware007', 'Animating-Buttons');

    return (
        <div className={modeToggle ? "dark_mode subNav" : "light_mode subNav"}>
            <div className="countContainer">
                <div className={modeToggle ? "light_mode counts" : "dark_mode counts"}>
                    <Diagram2 />
                    Forks: {forksCount}
                </div >
                <div className={modeToggle ? "light_mode counts" : "dark_mode counts"}>
                    <StarFill />
                    Stars: {starsCount}
                </div>
                <div className={modeToggle ? "light_mode counts" : "dark_mode counts"}>
                    <PeopleFill />
                    Contributors: {contributors.length}
                </div>
            </div>
        </div>
    );
};

export default Information;
