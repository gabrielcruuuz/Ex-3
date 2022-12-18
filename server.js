const express = requere('express');

const app = exrepress();

const appName = 'angular-lista-projetos';

const outputPath = `${__dirname}/dist/${appName}`

app.use(express.static(outputPath));

app.get('*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`);
});

app.listen(process.env.PORT);
