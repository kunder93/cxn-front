import { test, expect } from '@playwright/test'

test('visit kids school section page', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.locator('a').filter({ hasText: 'Escuela' }).click()
    await page.getByRole('button', { name: 'Informacion clases infantiles' }).click()
    await expect(page.getByRole('img', { name: 'Clase vacia' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escuela infantil Círculo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Compartir nuestra pasión por' })).toBeVisible()
    await expect(page.getByRole('button', { name: '¡ Cartel de las clases 24-25 !' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Amor caballuno' })).toBeVisible()
    await expect(page.getByText('Nos apasiona el ajedrez y')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Beneficios del ajedrez:' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Contacto:' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Preguntas frecuentes:' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Galeria de fotos:' })).toBeVisible()
    await page.getByRole('button', { name: 'Beneficios del ajedrez:' }).click()
    await expect(page.getByRole('heading', { name: 'Beneficios de el ajedrez en' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Beneficios de el ajedrez en niños:')
    await expect(page.getByRole('img', { name: 'piece changes like carousel' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Desarrollo cognitivo' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Ejercita la cabeza!:')
    await expect(page.getByRole('main')).toContainText(
        'Un gimnasio para la mente. Cuando juegas entrenas tu cerebro para pensar en grande y a largo plazo. Planificas tus movimientos y estrategias para ganar. En cada jugada, hay un montón de opciones y tienes que aprender a elegir la mejor decisión.'
    )
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('img', { name: 'Habilidades académicas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Como ir a la academia' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Mejora la concentración y' })).toBeVisible()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('img', { name: 'Habilidades sociales' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Habilidades sociales y' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText(
        'Cuando juegas, estás con otros niños y eso mola. Aprendes a competir sin peleas, a seguir las reglas y hasta a trabajar en equipo si juegas con amigos.'
    )
    await expect(page.getByRole('main')).toContainText(
        'El ajedrez te enseña a esperar tu turno y a no ponerte nervioso cuando estás en plena partida.Un entrenamiento para ser paciente y mantener la calma.'
    )
    await expect(page.getByRole('main')).toContainText(
        'El ajedrez te enseña a esperar tu turno y a no ponerte nervioso cuando estás en plena partida.Un entrenamiento para ser paciente y mantener la calma.'
    )
    await expect(page.getByRole('main')).toContainText(
        'Jugar con otros te hace entender cómo piensan y juegan. Aprendes a respetar cómo juegan tus oponentes y a entender que todos tienen su forma de hacer las cosas'
    )
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('img', { name: 'Habilidades emocionales' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Bienestar emocional')
    await expect(page.getByRole('main')).toContainText(
        'Cuando juegas ajedrez aprendes a lidiar con sentirte mal cuando pierdes y a sentirte genial cuando ganas. Te ayuda a aguantar cuando las cosas no van como quieres.'
    )
    await expect(page.getByRole('main')).toContainText(
        'Si mejoras en el juego, te das cuenta de lo capaz que eres, ¡y eso mola mucho! Te hace sentir más seguro y feliz contigo mismo.'
    )
    await expect(page.getByRole('main')).toContainText(
        'El ajedrez te hace concentrarte mucho, y eso hace que te olvides de las cosas que te estresan. Es como una pausa para la mente.'
    )
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await expect(page.getByRole('img', { name: 'piece changes like carousel' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Beneficios de el ajedrez en niños:')
    await expect(page.getByRole('img', { name: 'Diversión y creatividad' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Diversión y creatividad')
    await expect(page.getByRole('main')).toContainText('Creatividad táctica:')
    await expect(page.getByRole('main')).toContainText(
        'A través del juego, los niños desarrollan la capacidad de encontrar soluciones creativas para desafíos tácticos.'
    )
    await expect(page.getByRole('main')).toContainText(
        'Curiosidad y exploración:El ajedrez motiva a los niños a aprender constantemente nuevas estrategias y tácticas, fomentando su curiosidad.'
    )
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Contacto:' }).click()
    await expect(
        page
            .locator('div')
            .filter({ hasText: /^Solicita información:Asunto:Email:Mensaje:Enviar$/ })
            .nth(1)
    ).toBeVisible()
    await expect(page.locator('form')).toContainText('Solicita información:')
    await page.getByRole('textbox', { name: 'Email:' }).click()
    await page.getByRole('textbox', { name: 'Email:' }).fill('tesEmail@test.tes')
    await page.getByRole('textbox', { name: 'Mensaje:' }).click()
    await page
        .getByRole('textbox', { name: 'Mensaje:' })
        .fill(
            'Este email es para solicitar informacion sobre las clases de ajedrez.\nTengo un niño de 10 años que queria apuntarse a las clases no sabe nada pero le gusta. Queria informacion de horarios precios y lugar.Gracias !'
        )
    await page.getByText('Solicita información:Asunto:').click()
    await expect(page.locator('form')).toContainText('El texto debe tener como máximo 200 caracteres')
    await page.getByRole('textbox', { name: 'Mensaje:' }).click()
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowRight')
    await page.getByRole('textbox', { name: 'Mensaje:' }).press('ArrowDown')
    await page
        .getByRole('textbox', { name: 'Mensaje:' })
        .fill(
            'Este email es para solicitar informacion sobre las clases de ajedrez.\nTengo un niño de 10 años que queria apuntarse a las clases no sabe nada pero le gusta. Queria informacion de horarios.'
        )
    await expect(page.locator('form')).toMatchAriaSnapshot(`- button "Enviar"`)
    await page.getByRole('button', { name: 'Enviar' }).click()
    await page.getByRole('button', { name: 'Preguntas frecuentes:' }).click()
    await expect(page.locator('#root div').filter({ hasText: '1¿Cuándo empiezan las clases?' }).nth(4)).toBeVisible()
    await expect(page.getByRole('list')).toContainText('1¿Cuándo empiezan las clases?Las clases empiezan en Octubre y duran hasta Junio.')
    await expect(page.getByRole('list')).toContainText('2¿Qué dias y cuántas horas?Jueves y viernes, 1 hora cada día, de 16:00 a 19:00.')
    await expect(page.getByRole('list')).toContainText('3¿Dónde puedo apuntarme?En el padroado de deportes en C.P.M A Gándara o en nuestras oficinas.')
    await expect(page.getByRole('list')).toContainText(
        '5¿Necesito comprar algo para las clases o llevar algún material?Todo el material necesario lo proporciona el club.'
    )
    await page.getByRole('button', { name: 'Galeria de fotos:' }).click()
})
