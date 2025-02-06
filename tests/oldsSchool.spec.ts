import { test, expect } from '@playwright/test'

test('Visit old people school section page.', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.getByRole('link', { name: 'Adultos' }).click()
    await expect(page.getByRole('img', { name: 'Clase vacia' })).toBeVisible()
    await expect(page.locator('h1')).toContainText('Escuela adultos Círculo Xadrez Narón')
    await expect(page.getByRole('heading', { name: 'Escuela adultos Círculo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Compartir nuestra pasión por' })).toBeVisible()
    await expect(page.getByText('Nos apasiona el ajedrez y')).toBeVisible()
    await expect(page.getByRole('img', { name: 'Flecha verde creciente.' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Beneficios del ajedrez:' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Contacto:' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Preguntas frecuentes:' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Galeria de fotos:' })).toBeVisible()
    await expect(page.locator('header')).toContainText('Compartir nuestra pasión por el ajedrez al mismo tiempo que aprendemos y crecemos como personas.')
    await expect(page.getByRole('main')).toContainText(
        'Nos apasiona el ajedrez y estamos emocionados de compartir esta pasión con todos vosotros. Aquí no sólo aprendeás movimientos de piezas, descubrirás un universo de estrategia, amistad y diversión.'
    )
    await expect(page.getByRole('main')).toContainText('Beneficios del ajedrez:')
    await expect(page.getByRole('main')).toContainText('Contacto:')
    await expect(page.getByRole('main')).toContainText('Preguntas frecuentes:')
    await expect(page.getByRole('main')).toContainText('Galeria de fotos:')
    await page.getByRole('button', { name: 'Beneficios del ajedrez:' }).click()
    await expect(page.getByRole('heading', { name: 'Beneficios de el ajedrez en' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'piece changes like carousel' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Desarrollo cognitivo' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Mantén tu mente ágil y activa:')
    await expect(page.getByRole('main')).toContainText(
        'El ajedrez es un excelente ejercicio cerebral que ayuda a mejorar la memoria, la concentración y la agudeza mental.'
    )
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('img', { name: 'piece changes like carousel' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Habilidades académicas' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Aprendizaje continuo:')
    await expect(page.getByRole('main')).toContainText('Como ir a la academia')
    await expect(page.getByRole('main')).toContainText(
        'El ajedrez es un juego que siempre ofrece nuevos desafíos y oportunidades de aprendizaje. Aprender estrategias y tácticas más avanzadas puede ser un proceso gratificante y estimulante.'
    )
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('main')).toContainText('Habilidades sociales')
    await expect(page.getByRole('main')).toContainText('Desarrollo de habilidades sociales:')
    await expect(page.getByRole('main')).toContainText(
        'El ajedrez es una actividad social que puede conectar a personas de diferentes edades e intereses. Participar en clubes de ajedrez o torneos puede brindar la oportunidad de conocer gente nueva y construir relaciones.'
    )
    await expect(page.getByRole('img', { name: 'Habilidades sociales' })).toBeVisible()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('img', { name: 'Habilidades emocionales' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Bienestar emocional')
    await expect(page.getByRole('main')).toContainText(
        'Jugar al ajedrez puede ser una forma efectiva de reducir el estrés y relajarse. Al concentrarse en el juego, se puede desconectar de las preocupaciones diarias y encontrar un espacio mental de tranquilidad.'
    )
    await expect(page.getByRole('main')).toContainText('Autoestima y perseverancia:')
    await expect(page.getByRole('main')).toContainText(
        'A medida que se mejora en el juego, se experimenta un aumento en la confianza en sí mismo y en la capacidad para superar desafíos. Este sentimiento de logro puede impactar positivamente la autoestima y la perseverancia en otros aspectos de la vida.'
    )
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('img', { name: 'piece changes like carousel' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Diversión y creatividad' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Diversión y creatividad')
    await expect(page.getByRole('main')).toContainText(
        'La creatividad en el ajedrez se manifiesta en la toma de decisiones innovadoras, la resolución de problemas y la capacidad para pensar fuera de los esquemas convencionales para alcanzar el éxito.'
    )
    await expect(page.getByRole('main')).toContainText('Creatividad táctica:')
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Beneficios del ajedrez:' }).click()
    await page.getByRole('button', { name: 'Preguntas frecuentes:' }).click()
    await expect(page.locator('#root div').filter({ hasText: '1¿Cuándo empiezan las clases?' }).nth(4)).toBeVisible()
    await page.getByRole('button', { name: 'Preguntas frecuentes:' }).click()
    await page.getByRole('button', { name: 'Contacto:' }).click()
    await expect(
        page
            .locator('div')
            .filter({ hasText: /^Solicita información:Asunto:Email:Mensaje:Enviar$/ })
            .nth(1)
    ).toBeVisible()
    await page.getByRole('button', { name: 'Galeria de fotos:' }).click()
    await expect(
        page
            .locator('div')
            .filter({ hasText: /^PreviousNext$/ })
            .nth(1)
    ).toBeVisible()
})
