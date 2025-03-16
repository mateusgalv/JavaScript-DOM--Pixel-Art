# Projeto Pixel Art

## Sobre o Projeto

O **Pixel Art** é uma aplicação web interativa que permite aos usuários criar desenhos pixelados em uma grade customizável. O usuário pode escolher cores e pintar pixels. O projeto foi desenvolvido com foco em fornecer uma experiência simples e divertida, ao mesmo tempo em que explora conceitos importantes de manipulação da árvore de elementos (DOM) e armazenamento local (Web Storage).

### Funcionalidades Principais:
- **Grade de Pixels**: Uma grade interativa e customizável onde o usuário pode pintar pixels.
- **Seleção de Cores**: Um seletor de cores para escolher a cor desejada entre cores geradas aleatoriamente e cores fixas.
- [EM DESENVOLVIMENTO] **Salvar e Recuperar Desenhos**: Utilização do **WebStorage** para salvar e carregar desenhos.
- [EM DESENVOLVIMENTO] **Responsividade**: Design adaptável para diferentes tamanhos de tela.

---

### Principais tópicos aplicados

#### 1. **DOM (Document Object Model)**
O DOM foi amplamente utilizado para manipular dinamicamente os elementos da página. Algumas das operações realizadas incluem:
- **Criação dinâmica de elementos**: A grade de pixels é gerada dinamicamente com base no tamanho escolhido pelo usuário.
- **Escutadores de Eventos - Event listeners**: Foram adicionados escutadores para eventos como `click` e `input` para interagir com a grade e o seletor de cores.
- **Atualização de estilos**: As cores dos pixels são alteradas dinamicamente com base na interação do usuário.

#### 2. **Web Storage**
O **Web Storage**, mais especificamente o **sessionStorage**, foi utilizado para armazenamento da seleção atual de cor do usuário. O sessionStorage é uma API do navegador que permite armazenar dados localmente (no cliente) de forma temporária, enquanto o navegador não for fechado.

---

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/mateusgalv/JavaScript-DOM--Pixel-Art.git

2. **Abra o projeto**:
    Navegue até a pasta do projeto:
    ```bash
        cd JavaScript-DOM--Pixel-Art
    
    Abra o arquivo index.html no seu navegador.

3. **Comece a criar**:
    - Escolha uma cor no seletor de cores.
    - Clique nos pixels da grade para pintá-los.
    - Seu desenho será automaticamente salvo no LocalStorage.

## Estrutura do Projeto
pixel-art/
│
├── index.html          # Arquivo principal HTML
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Este arquivo
└── assets/             # Pasta para imagens ou outros recursos

Exemplo de Uso

    Criando um Desenho:

        Escolha uma cor no seletor de cores.

        Clique nos pixels da grade para pintá-los.

    Salvando e Recuperando:

        O desenho é salvo automaticamente no LocalStorage.

        Ao recarregar a página, o desenho salvo será carregado automaticamente.

    Resetando a Grade:

        Use o botão "Limpar Grade" para apagar o desenho atual e começar uma nova criação.

Captura de Tela

<img src="./assets/pixel-heart.jpg"></img>

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
🙌 Contribuições

Contribuições são bem-vindas! Se você tiver sugestões ou encontrar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request.
🌐 Contato

    GitHub: seu-usuario

    LinkedIn: Seu Nome

    E-mail: seu-email@example.com