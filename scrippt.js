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


});
