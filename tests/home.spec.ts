import { test, expect } from '@playwright/test'

test('La página de inicio debe cargarse correctamente', async ({ page }) => {
    await page.goto('/') // Va a la página principal
    await expect(page).toHaveTitle(/Xadrez Narón/) // Reemplaza con el título de tu app
    await expect(page.getByRole('heading', { name: 'Circulo Xadrez Narón te da la bienvenida !' })).toBeVisible()
})

test('La imagen de la cabecera debe ser visible', async ({ page }) => {
    // Ir a la página principal
    await page.goto('/') // Cambia la URL si es diferente

    // Seleccionar la imagen por su selector y verificar que sea visible
    const headerImage = page.locator('img[alt="Imagen cabecera pagina principal."]')
    await expect(headerImage).toBeVisible()
})

test('Verificar estructura de la página de inicio', async ({ page }) => {
    // 1️⃣ Ir a la página principal
    await page.goto('/') // Cambia la URL si es necesario

    // 2️⃣ Verificar que el primer section tiene una imagen de cabecera
    const firstSection = page.locator('section').first()
    await expect(firstSection.locator('img')).toBeVisible()

    // 3️⃣ Verificar el h1 con el texto de bienvenida
    await expect(page.locator('h1')).toHaveText('Circulo Xadrez Narón te da la bienvenida !')

    // 4️⃣ Seleccionar todos los sections después del primero
    const sections = page.locator('section').nth(1).locator('section')

    // 5️⃣ Verificar el primer sub-section (actividades)
    const activitiesSection = sections.nth(0)
    await expect(activitiesSection.locator('h2')).toHaveText('Prueba nuestras actividades de forma gratuita sin ser soci@:')
    // '> article' solo los hijos directos
    await expect(activitiesSection.locator('> article')).toHaveCount(3)

    // 6️⃣ Verificar el segundo sub-section (beneficios)
    const benefitsSection = sections.nth(1)
    await expect(benefitsSection.locator('h2')).toHaveText('Beneficios de hacerte socio:')
    await expect(activitiesSection.locator('> article')).toHaveCount(3)
})

test.describe('Footer Component Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/') // Reemplázalo con la URL real
        await page.waitForSelector('footer') // Esperar a que cargue el footer
    })

    test('should render main footer structure', async ({ page }) => {
        const footer = page.locator('footer')
        await expect(footer).toBeVisible()
    })

    test('should have social media links other tests', async ({ page }) => {
        await page.waitForSelector('#footer1Row', { state: 'attached', timeout: 7000 }) // Espera a que el contenedor esté en el DOM

        const socialContainer = page.locator('#footer1Row')
        console.log(await socialContainer.count()) // Muestra cuántos elementos se encuentran

        await expect(socialContainer).toBeVisible()
    })

    test('should have legal links', async ({ page }) => {
        const legalLinks = [
            { text: 'Aviso Legal', href: '/legalnotice' },
            { text: 'Política de privacidad', href: '/privacypolicy' }
        ]

        const legalContainer = page.locator('#footer3Row')
        await expect(legalContainer).toBeVisible()

        for (const link of legalLinks) {
            const anchor = legalContainer.locator(`a:has-text("${link.text}")`)
            await expect(anchor).toHaveAttribute('href', link.href)
        }
    })

    test('should display copyright notice', async ({ page }) => {
        const copyright = page.locator('#footer4Row')
        await expect(copyright).toHaveText('© 2024 Círculo Xadrez Narón')
    })

    test('should verify image attributes', async ({ page }) => {
        const narontecImage = page.locator('img[alt="Logo patrocinador Narontec."]')
        await expect(narontecImage).toHaveAttribute('src', '/Footer/logotipo-narontec-web.avif')
        await expect(narontecImage).toHaveAttribute('width', '315')
        await expect(narontecImage).toHaveAttribute('height', '55')
        await expect(narontecImage).toHaveAttribute('loading', 'lazy')
    })

    test('should have proper link security attributes', async ({ page }) => {
        const externalLinks = page.locator('a[target="_blank"]')
        const count = await externalLinks.count()

        for (let i = 0; i < count; i++) {
            const link = externalLinks.nth(i)
            await expect(link).toHaveAttribute('rel', /noopener noreferrer/)
        }
    })
})
