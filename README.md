# Ruscello Medicinal

Site institucional para ONG voltada à saúde comunitária, com páginas de apresentação, projetos e cadastro de voluntários. Desenvolvido como SPA (Single Page Application) com JavaScript modular (ES6).

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (variáveis, Flexbox, Grid, media queries)
- JavaScript (ES6 Modules)
- Day.js (formatação de datas, via CDN)
- Git e GitHub (GitFlow)

## Pré-requisitos

- Navegador atualizado (Chrome, Firefox, Edge)
- Extensão Live Server (VS Code) ou qualquer servidor HTTP local, pois o projeto usa ES Modules e fetch, que não funcionam abrindo o HTML diretamente (file://)

## Instalação e execução local

```bash
git clone https://github.com/ruscello7/ruscello-medicinal.git
cd ruscello-medicinal
```

Abra a pasta no VS Code, clique com o botão direito em `html/index.html` e selecione **"Open with Live Server"**.

## Estrutura do projeto
css/ estilos (style.css)
html/ páginas (index, projetos, cadastro)
img/ imagens
js/ módulos JavaScript (app, dom, storage, validacao, modal, projetos, voluntarios, formulario, roteador)


## Versionamento

O projeto segue o modelo **GitFlow**:
- `main`: versões estáveis
- `develop`: desenvolvimento contínuo
- `feature/*`: novas funcionalidades, integradas via merge/pull request

## Testes

Testes manuais realizados via navegador (preenchimento de formulário, validação de campos, persistência em localStorage e navegação entre páginas).