import { test, expect } from '@playwright/test'

test('Visit main school section page.', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.locator('a').filter({ hasText: 'Escuela' }).click()
    await expect(page.getByRole('img', { name: 'Clase vacia' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Nuestra clase con niños' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Clase con personas reunidas' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Clase online' })).toBeVisible()
    await expect(page.locator('section')).toContainText('Clases infantiles')
    await expect(page.getByText('Las clases para niños y niñas')).toBeVisible()
    await expect(page.locator('section')).toContainText(
        'Las clases para niños y niñas de 5 a 18 años se imparten del 1 de Octubre al 31 de Junio los Lunes y Viernes de 16:00 a 20:00. 2 Horas semanales a escoger.'
    )
    await expect(page.getByRole('heading', { name: 'Clases para adultos' })).toBeVisible()
    await expect(page.locator('#middleContentArticle')).toContainText('Clases para adultos')
    await expect(page.getByText('Las clases para adultos se')).toBeVisible()
    await expect(page.locator('#middleContentArticle')).toContainText(
        'Las clases para adultos se realizan los Martes y Jueves en grupos reducidos de 18:00 a 20:00 y los Sábados en Grupo abierto de 11:00 a 13:00.'
    )
    await expect(page.getByRole('heading', { name: 'Clases Online' })).toBeVisible()
    await expect(page.locator('section')).toContainText('Clases Online')
    await expect(page.getByText('Las clases online son')).toBeVisible()
    await expect(page.locator('section')).toContainText(
        'Las clases online son impartidas de forma individual o en pequeños grupos. Es preferible el uso de ordenador. Horario flexible.'
    )
    await expect(page.getByRole('button', { name: 'Informacion clases infantiles' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Informacion clases adultos' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Informacion clases online' })).toBeVisible()
})
