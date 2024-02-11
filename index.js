const schemeContainer = document.getElementById('scheme-container')
const colorEl = document.getElementById('color')
const schemeEl = document.getElementById('scheme')
const btnColor = document.getElementById('btn-scheme')
const copyMsg = document.getElementById('copy-message')


btnColor.addEventListener('click', async (event) => {
    
    const URL = `https://www.thecolorapi.com/scheme?hex=${colorEl.value.substring(1)}&mode=${schemeEl.value}&count=5`
    const response = await fetch(URL)
    const data = await response.json()
    generateSchemeEl(data)
})

function generateSchemeEl(scheme) {
    schemeContainer.innerHTML = ''
    scheme.colors.map(color => schemeContainer.appendChild(generateColorContainer(color)))    
}

function generateColorContainer(color) {
    const colorContainer = document.createElement('div')
    colorContainer.classList.add('color-container')
    
    const colorDiv = document.createElement('div')
    colorDiv.classList.add('color-bg-container')
    colorDiv.style.backgroundColor = color.hex.value
    colorDiv.textContent = ' '
    const hexDiv = document.createElement('div')
    hexDiv.classList.add('color-hex-container')
    hexDiv.textContent = color.hex.value
    hexDiv.addEventListener('click', handleCopyText)
    
    colorContainer.appendChild(colorDiv)
    colorContainer.appendChild(hexDiv)
    
    return colorContainer
}


async function handleCopyText(event) {
    const textToCopy = event.target.textContent
    try {
        if (document.URL.includes('scrimba')) {
            console.log(`Pretend to copy to clipboard: ${textToCopy}`)
        } else {
            await navigator.clipboard.writeText(textToCopy);
        }
        copyMsg.classList.toggle('slide-down')
        setTimeout(() => {
            copyMsg.classList.toggle('slide-down')
        }, 1000)
        console.log('Content copied to clipboard');
        /* Resolved - text copied to clipboard successfully */
    } catch (err) {
        console.error('Failed to copy: ', err);
        /* Rejected - text failed to copy to the clipboard */
    }
}
