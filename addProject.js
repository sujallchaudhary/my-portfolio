const projectForm = document.getElementById('projectForm');
projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const submitData = {
        projectName: document.getElementById('projectName').value,
        projectDescription: document.getElementById('projectDescription').value,
        projectDemo: document.getElementById('projectDemo').value,
        password: document.getElementById('password').value,
        projectSourceCode: document.getElementById('projectSourceCode').value,
        isLive: document.getElementById('isLive').checked ? 1 : 0,
        isSourceCode: document.getElementById('isSourceCode').checked ? 1 : 0
    };
    formData.append('data', JSON.stringify(submitData));
    formData.append('file', document.getElementById('projectImg').files[0]);

    const object = {
        method: 'POST',
        body: formData
    };
    
    try {
        const response = await fetch('https://api.sujal.info/portfolio/addProject', object);
        const data = await response.json();
        if (data.success === 'success') {
            alert('Project Added Successfully');
            projectForm.reset();
        } else {
            alert('Something went wrong');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
