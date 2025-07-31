document.getElementById('registrationForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const college = document.getElementById('college').value;

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, college })
        });

        const text = await response.text();
        console.log('Raw Response:',text);
        let data;

        try{
            data = JSON.parse(text);
        } catch (err){
            console.error('Failed to parse JSON:', err);
            alert('Server responded, but sent invalid JSON.');
            return;
        }
        if(response.ok){
            document.getElementById('successMsg').innerText=data.msg;
            /*alert(data.msg);*/
        }else{
            alert(`Failed: ${data.msg}`);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('Failed to connect to server. ');
    }
});

/*document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const college = document.getElementById('college').value.trim();

    // Simple Validation
    if (name === '' || email === '' || phone === '' || college === '') {
        alert('Please fill all fields');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email');
        return;
    }

    if (phone.length < 10) {
        alert('Phone number should be at least 10 digits');
        return;
    }

    // Success Message (Later this will call backend)
    document.getElementById('successMsg').innerText = 'Registration Successful!';
});*/