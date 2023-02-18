import express, { Request, Response } from 'express';

const app = express()
const PORT = process.env.PORT || 3300

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
    courses: [
        {id: 0, title: 'front-end'},
        {id: 1, title: 'back-end'},
        {id: 2, title: 'QA'},
        {id: 3, title: 'DevOps'},
    ]
}

app.get('/courses', (req: Request, res: Response) => {
    if (req.query.title) {
        const foundCourses = db.courses.find(el => el.title.toLowerCase().includes((req.query.title as string).toLowerCase()))
        res.json(foundCourses)
    } 

    res.json(db.courses)
})

app.get('/courses/:id', (req: Request, res: Response) => {
    const foundCourse = db.courses.find(el => el.id === Number(req.params.id))

    if(!foundCourse) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(foundCourse)
})

app.post('/courses', (req: Request, res: Response) => {
    if(!req.body.title) {
        res.sendStatus(400)
        return
    }

    const createdCourse = {
        id: Date.now(),
        title: req.body.title
    }

    db.courses.push(createdCourse)

    res.status(201).json(createdCourse)
})

app.delete('/courses/:id', (req: Request, res: Response) => {
    db.courses = db.courses.filter(el => el.id !== Number(req.params.id))

    res.sendStatus(204)
})

app.put('/courses/:id', (req: Request, res: Response) => {
    if(!req.body.title) {
        res.sendStatus(400)
        return
    }

    const foundCourse = db.courses.find(el => el.id === Number(req.params.id))

    if(!foundCourse) {
        res.sendStatus(404)
        return
    }

    foundCourse.title = req.body.title

    res.status(200).json(foundCourse)
})

app.listen(PORT, () => {
    console.log(`Server successfully started at PORT: ${PORT}`);
})