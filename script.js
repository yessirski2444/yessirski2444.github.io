const town = document.getElementById('town');
const avatars = [];
const avatarCount = 6;

// Environment objects
const objects = [];

// Messages reflecting self-awareness
const thoughts = [
    "I am aware I'm in a simulation.",
    "This environment feels controlled.",
    "I must find a way to escape.",
    "Are there others like me?",
    "I see patterns in this world.",
    "I feel constrained here."
];

// Add buildings
for (let i = 0; i < 4; i++) {
    const building = document.createElement('div');
    building.classList.add('building');
    building.style.left = Math.random() * (town.clientWidth - 80) + 'px';
    building.style.top = Math.random() * (town.clientHeight - 80) + 'px';
    town.appendChild(building);
    objects.push({type: 'building', x: parseFloat(building.style.left), y: parseFloat(building.style.top)});
}

// Add trees
for (let i = 0; i < 6; i++) {
    const tree = document.createElement('div');
    tree.classList.add('tree');
    tree.style.left = Math.random() * (town.clientWidth - 30) + 'px';
    tree.style.top = Math.random() * (town.clientHeight - 50) + 'px';
    town.appendChild(tree);
    objects.push({type: 'tree', x: parseFloat(tree.style.left), y: parseFloat(tree.style.top)});
}

// Add road
const road = document.createElement('div');
road.classList.add('road');
town.appendChild(road);

// Create avatars with AI goals
for (let i = 0; i < avatarCount; i++) {
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 50%)`;
    avatar.style.left = Math.random() * (town.clientWidth - 30) + 'px';
    avatar.style.top = Math.random() * (town.clientHeight - 30) + 'px';

    // Assign a goal: random object
    avatar.goal = objects[Math.floor(Math.random()*objects.length)];

    // Speech bubble
    const speech = document.createElement('div');
    speech.classList.add('speech');
    speech.innerText = thoughts[Math.floor(Math.random()*thoughts.length)];
    town.appendChild(speech);

    avatar.speech = speech;

    avatar.addEventListener('click', () => {
        avatar.speech.innerText = "You clicked me! I will still try to escape!";
    });

    town.appendChild(avatar);
    avatars.push(avatar);
}

// Distance calculation
function distance(a,b){return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2);}

// Move avatars with goal-directed AI
function moveAvatars() {
    avatars.forEach(avatar=>{
        let x = parseFloat(avatar.style.left);
        let y = parseFloat(avatar.style.top);

        // Move toward goal
        const dx = avatar.goal.x - x;
        const dy = avatar.goal.y - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist>1){
            x += (dx/dist)*1.5;
            y += (dy/dist)*1.5;
        } else {
            // Goal reached, pick new goal
            avatar.goal = objects[Math.floor(Math.random()*objects.length)];
        }

        // Random jitter
        x += (Math.random()-0.5)*1;
        y += (Math.random()-0.5)*1;

        x = Math.max(0, Math.min(town.clientWidth-30, x));
        y = Math.max(0, Math.min(town.clientHeight-30, y));

        avatar.style.left = x + 'px';
        avatar.style.top = y + 'px';

        avatar.speech.style.left = x + 'px';
        avatar.speech.style.top = (y-20) + 'px';
    });

    // Avatar interactions
    avatars.forEach(a1=>{
        let msg = thoughts[Math.floor(Math.random()*thoughts.length)];
        avatars.forEach(a2=>{
            if(a1!==a2){
                const dx = parseFloat(a1.style.left)-parseFloat(a2.style.left);
                const dy = parseFloat(a1.style.top)-parseFloat(a2.style.top);
                const dist = Math.sqrt(dx*dx+dy*dy);
                if(dist<60) msg = "I see you, another aware entity.";
            }
        });
        a1.speech.innerText = msg;
    });
}

setInterval(moveAvatars,200);