const fetchProjects = async (type) => {
    const object ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({type})
    }
    const response = await fetch('https://api.sujal.info/portfolio/projects',object);
    const data = await response.json();
    return data;
};
const fetchSkills = async () => {
    const object ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({type:'display'})
    }
    const response = await fetch('https://api.sujal.info/portfolio/skills',object);
    const data = await response.json();
    return data;
};
const displaySkills = async () => {
    let html = '';
    const skills = await fetchSkills();
    if(skills.length > 0){
        skills.forEach(skill => {
            html += `<div class="bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col items-center">
                <img class="h-12 mb-2" src="${skill.img}" alt="${skill.name}">
                <span class="text-xl font-semibold">${skill.name}</span>
            </div>`;
        });
    }
    else{
        html = `<div class="w-full text-center"><h1 class="text-2xl">No Skills Found</h1></div>`;
    }
    const skillContainer=document.getElementById('skillContainer');
    skillContainer.innerHTML = html;
};
const displayProjects = async (type) => {
    let html = '';
    const projects = await fetchProjects(type);
    if(projects.length > 0){
        projects.forEach(project => {
            html += `
                <div class="w-full px-4 md:w-1/2 xl:w-1/3">
                <div class="mb-10 overflow-hidden duration-300 bg-white dark:bg-gray-900 rounded-lg shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3">
                    <img
                        src="${project.projectImg}"
                        alt="image"
                        class="w-full"
                    />
                    <div class="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                        <h3>
                            <a
                                href="${project.projectDemo}"
                                class="text-gray-900 dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                            >
                                ${project.projectName}
                            </a>
                        </h3>
                        <p class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-7">
                            ${project.projectDescription}
                        </p>
                        <a href="${project.projectDemo}" style="display:${project.isLive==1?"block":"none"}" class="mb-2 inline-block py-2 text-base font-medium transition border rounded-full text-gray-700 hover:border-primary hover:bg-primary border-gray-300 px-7 hover:text-white dark:border-gray-700 dark:text-gray-300 mx-2">
                            Live Project
                        </a>
                        <a href="${project.projectSourceCode}" style="display:${project.isSourceCode==1?"block":"none"}" class="inline-block py-2 text-base font-medium transition border rounded-full text-gray-700 hover:border-primary hover:bg-primary border-gray-300 px-7 hover:text-white dark:border-gray-700 dark:text-gray-300">
                            Source Code
                        </a>
                    </div>
                </div>
            </div>
            `;
        });
    }
    else{
        html = `<div class="w-full text-center"><h1 class="text-2xl">No Projects Found</h1></div>`;
    }
    const projectContainer=document.getElementById('projectContainer');
    projectContainer.innerHTML = html;
};
const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
        const name= document.getElementById('name').value
        const email= document.getElementById('email').value
        const phoneNo= document.getElementById('phoneNo').value
        const subject= document.getElementById('subject').value
        const message= document.getElementById('message').value
    const object = {
        method: 'POST',
        body: JSON.stringify({name,email,phoneNo,subject,message}),
    };
    try{
        const response = await fetch('https://api.sujal.info/portfolio/contact',object);
        const data = await response.json();
        if(data.success){
            alert('Message Sent Successfully');
            messageForm.reset();
        }
        else{
            alert('Something went wrong');
        }
    }
    catch(error){
        alert('Error: ' + error.message);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    displayProjects('display');
    displaySkills();
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    function changeLinkState() {
        let currentSection = sections[0];
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= window.innerHeight / 2) {
                currentSection = section;
            }
        });
        navLinks.forEach((link) => link.classList.remove("active-link"));
        const activeLink = document.querySelector(`.nav-link[href="#${currentSection.id}"]`);
        if (activeLink) {
            activeLink.classList.add("active-link");
        }
    }
    changeLinkState();
    window.addEventListener("scroll", changeLinkState);
});

