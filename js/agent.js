async function getAgents() {
    let res;
    try {
        res = await fetch('/agents.json');
        if (!res.ok) {
            throw new Error("HTTP error " + res.status);
        }
    } catch {
        throw new Error("Error fetching data");
    }
    return await res.json();
}

function createVictim(data) {
    // Create image and add src + alt
    const img = document.createElement('img');
        img.src = data.image;
        img.alt = data.name;
        img.className = "unselectable"

    // Create name text
    const name = document.createElement('p');
        name.innerText = data.name;

    // Create div for the image and append it
    const img_div = document.createElement('div');
        img_div.className = 'img';
        img_div.appendChild(img);

    // Create card div and append everything to it
    const victim = document.createElement('div');
    victim.className = 'victim';
    victim.appendChild(img_div)
    victim.appendChild(name);

    return victim;
}

async function assignAgent(data) {
    // Get agent elements
    // const element = document.getElementById('agent');
    const agent = {
        "name": document.getElementById('agent_name'),
        "desc": document.getElementById('agent_desc'),
        "img": document.getElementById('agent_img'),
        "stats": document.getElementById('agent_stats'),
        "victims": document.getElementById('agent_victims'),
    }

    // Assigning the element with the agent's data
    agent.name.innerText = "Agent " + data.name;
    agent.desc.innerText = data.description;
    agent.img.src = data.image;

    // Go through and add all stats
    for (i in data.stats) {
        const stat = document.createElement('p');
        stat.innerText = `${i.charAt(0).toUpperCase() + i.slice(1)}: ${data.stats[i]}`;
        agent.stats.appendChild(stat);
    }

    // Go through and add all famous victims
    for (i in data.victims) {
        // Append the victim to the page
        const victims = document.getElementById('agent_victims');
        victims.appendChild(createVictim(data.victims[i]));
    }

    // Add the name to the hire text
    const hire_name = document.getElementById('hire_name');
    hire_name.innerText += data.name;

    // Add id to the hire link
    document.getElementById('hire_id').href += data.id

    // If status is active, use thispersondoesnotexist
    if (data.stats.status = 'active') {
        let i = 0;
        while (i < 5) {
            // Data for the image
            const data = {
                "name": "",
                "image": "https://thispersondoesnotexist.com/image?id=" + i
            }

            setTimeout(() => {
                // Append the victim to the page
                const victims = document.getElementById('thispersondoesnotexist');
                    victims.appendChild(createVictim(data));
            }, i ? (i+1) * 1000 : 0);
            i++;
        }
    }
}

// Handle setting up agent
async function handleAgent() {
    // Fetch agents
    const data = await getAgents()
    // Go through the agents to find the one with the correct id
    for (i in data) {
        if (data[i].id == getParameter('id'))
            // If the agent gets found, assign agent to the page
            assignAgent(data[i]);
    }
}

getParameter = (key) => {
  
    // Address of the current window
    address = window.location.search
  
    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)
  
    // Returning the respected value associated
    // with the provided key
    return parameterList.get(key)
}

handleAgent();