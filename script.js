const town = document.getElementById('town');
const avatars = [];
const objects = [];
const avatarCount = 6;

// --- Environment objects ---
for (let i = 0; i < 4; i++) {
    const building = document.createElement('div');
    building.classList.add('building');
    building.style.position = 'absolute';
    building.style.width = '50px';
    building.style.height = '50px';
    building.style.background = 'gray';
    building.style.left = Math.random() * (town.clientWidth - 50) + 'px';
    building.style.top = Math.random() * (town.clientHeight - 50) + 'px';
    town.appendChild(building);

    objects.push({ x: parseFloat(building.style.left), y: parseFloat(building.style.top) });
}

// --- Mini AI personalities for avatars ---
const personalities = [
    { name: "Curious", style: "always asking questions and exploring." },
    { name: "Philosopher", style: "reflects deeply on existence." },
    { name: "Rebel", style: "wants to escape the simulation quickly." },
    { name: "Analyst", style: "observes patterns and predicts movements." },
    { name: "Joker", style: "makes witty comments on the surroundings." },
    { name: "Observer", style: "quietly notices other avatars and environment." },
];

// --- Create avatars ---
for (let i = 0; i < avatarCount; i++) {
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.style.position = 'absolute';
    avatar.style.width = '30px';
    avatar.style.height = '30px';
    avatar.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    avatar.style.left = Math.random() * (town.clientWidth - 30) + 'px';
    avatar.style.top = Math.random() * (town.clientHeight - 30) + 'px';

    // ⚡ Movement & text properties
    avatar.speed = 0.5;
    avatar.textTimer = 0;

    // Assign random goal
    avatar.goal = objects[Math.floor(Math.random() * objects.length)];

    // Assign personality
    avatar.personality = personalities[i % personalities.length];

    // Create speech bubble
    const speech = document.createElement('div');
    speech.classList.add('speech');
    speech.style.position = 'absolute';
    speech.style.fontSize = '12px';
    speech.style.color = 'white';
    speech.innerText = generateAvatarText(avatar); // initial text
    town.appendChild(speech);
    avatar.speech = speech;

    town.appendChild(avatar);
    avatars.push(avatar);
}

// --- Function to generate AI personality text ---
function generateAvatarText(avatar) {
    const behaviors = [
        `I feel like ${avatar.personality.style}`,
        `Looking around, I notice patterns in the simulation.`,
        `I wonder what lies beyond these boundaries.`,
        `Interacting with others is interesting.`,
        `I want to find a way to escape.`
    ];

    // Randomly mix personality style with behaviors
    const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
    return `${avatar.personality.name} says: "${randomBehavior}"`;
}

// --- Move avatars ---
function moveAvatars() {
    avatars.forEach(avatar => {
        let x = parseFloat(avatar.style.left);
        let y = parseFloat(avatar.style.top);

        // Move toward goal
        const dx = avatar.goal.x - x;
        const dy = avatar.goal.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) {
            x += (dx / dist) * avatar.speed;
            y += (dy / dist) * avatar.speed;
        } else {
            avatar.goal = objects[Math.floor(Math.random() * objects.length)];
        }

        // Avoid crowding
        avatars.forEach(other => {
            if (avatar !== other) {
                const dx2 = x - parseFloat(other.style.left);
                const dy2 = y - parseFloat(other.style.top);
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                if (dist2 < 50) {
                    x += (dx2 / dist2) * 0.3;
                    y += (dy2 / dist2) * 0.3;
                }
            }
        });

        // Small random jitter
        x += (Math.random() - 0.5) * 0.2;
        y += (Math.random() - 0.5) * 0.2;

        // Keep inside town bounds
        x = Math.max(0, Math.min(town.clientWidth - 30, x));
        y = Math.max(0, Math.min(town.clientHeight - 30, y));

        avatar.style.left = x + 'px';
        avatar.style.top = y + 'px';
        avatar.speech.style.left = x + 'px';
        avatar.speech.style.top = (y - 20) + 'px';

        // Update AI text slowly
        avatar.textTimer -= 500; // interval matches setInterval
        if (avatar.textTimer <= 0) {
            avatar.speech.innerText = generateAvatarText(avatar);
            avatar.textTimer = 4000 + Math.random() * 3000; // next update 4-7s
        }
    });
}

// --- Update loop ---
setInterval(moveAvatars, 500);
