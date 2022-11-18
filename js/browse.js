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

function createAgent(data, list, side) {
    // Create image and add src + alt
    const img = document.createElement('img');
        img.src = data.image;
        img.alt = data.name;
        img.className = "unselectable"

        
    // Create div for the image and append it
    const img_div = document.createElement('div');
        img_div.className = 'img';
        img_div.appendChild(img);

    // Create name element
    const name = document.createElement('p');
        name.innerText = "Agent " + data.name;

    // Create stats
    const consistency = document.createElement('p');
        consistency.innerText = "Consistency: " + data.stats.consistency;
    const status = document.createElement('p');
        status.innerText = "Status: " + data.stats.status;
    const experience = document.createElement('p');
        experience.innerText = "Experience: " + data.stats.experience;

    // Create stats element
    const stats = document.createElement('div');
        stats.className = 'stats';
        stats.appendChild(consistency);
        stats.appendChild(status);
        stats.appendChild(experience);

    // Create div for the text and append it
    const txt = document.createElement('div');
        txt.className = 'txt';
        txt.appendChild(name);
        txt.appendChild(stats);

    // Create div for the content and append it
    const cont = document.createElement('div');
        cont.className = 'cont';
        cont.appendChild(txt);

    // Create the card for the agent and append all elements to it
    const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(side ? 'right' : 'left');
        card.appendChild(img_div);
        card.appendChild(cont);

    // Append the card to the list
    list.appendChild(card);
}

async function handleAgents() {
    const list = document.getElementById('agent_list');
    const agents = await getAgents();
    for (i in agents) {
        createAgent(agents[i], list, i%2);
    }
}

handleAgents();