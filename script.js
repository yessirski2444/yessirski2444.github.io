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

    // ⚡ NEW: properties for slow movement and slow text
    avatar.speed = 0.5;       // all avatars move slower and uniformly
    avatar.textTimer = 0;     // timer for speech updates

    // Speech bubble
    const speech = document.createElement('div');
    speech.classList.add('speech');
    speech.innerText = thoughts[Math.floor(Math.random()*thoughts.length)];
    town.appendChild(speech);

    avatar.speech = speech;

    // Click interaction
    avatar.addEventListener('click', () => {
        avatar.speech.innerText = "You clicked me! I will still try to escape!";
    });

    town.appendChild(avatar);
    avatars.push(avatar);
}

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

        if(dist > 1){
            x += (dx/dist) * avatar.speed;
            y += (dy/dist) * avatar.speed;
        } else {
            avatar.goal = objects[Math.floor(Math.random()*objects.length)];
        }

        // Avoid crowding
        avatars.forEach(other=>{
            if(avatar !== other){
                let dx2 = x - parseFloat(other.style.left);
                let dy2 = y - parseFloat(other.style.top);
                let dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
                if(dist2 < 50){
                    x += (dx2/dist2)*0.3;
                    y += (dy2/dist2)*0.3;
                }
            }
        });

        // Small random jitter
        x += (Math.random()-0.5)*0.2;
        y += (Math.random()-0.5)*0.2;

        // Boundaries
        x = Math.max(0, Math.min(town.clientWidth-30, x));
        y = Math.max(0, Math.min(town.clientHeight-30, y));

        avatar.style.left = x + 'px';
        avatar.style.top = y + 'px';
        avatar.speech.style.left = x + 'px';
        avatar.speech.style.top = (y-20) + 'px';

        // Slow text updates
        avatar.textTimer -= 500; // matches interval below
        if(avatar.textTimer <= 0){
            let msg = thoughts[Math.floor(Math.random()*thoughts.length)];
            avatar.speech.innerText = msg;
            avatar.textTimer = 3000 + Math.random()*2000; // next update 3-5s
        }
    });
}

        // Small random jitter
        x += (Math.random()-0.5)*0.2;
        y += (Math.random()-0.5)*0.2;

        // Boundaries
        x = Math.max(0, Math.min(town.clientWidth-30, x));
        y = Math.max(0, Math.min(town.clientHeight-30, y));

        avatar.style.left = x + 'px';
        avatar.style.top = y + 'px';
        avatar.speech.style.left = x + 'px';
        avatar.speech.style.top = (y-20) + 'px';

        // Slow text updates
        avatar.textTimer -= 500; // interval in ms
        if(avatar.textTimer <= 0){
            let msg = thoughts[Math.floor(Math.random()*thoughts.length)];
            avatar.speech.innerText = msg;
            avatar.textTimer = 3000 + Math.random()*2000; // next update 3-5s
        }
    });
}

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

setInterval(moveAvatars, 500); // update avatars every 0.5s
avatars.forEach(avatar => {
    avatar.speed = 0.5; // All avatars now move at the same slower speed
});
