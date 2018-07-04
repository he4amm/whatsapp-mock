# WhatsappMockApp

Angular5 app for mocking WhatsApp.
### Demo project available here: https://he4amm.github.io/whatsapp-mock/

![alt text](https://raw.githubusercontent.com/he4amm/wahtsapp-mock/master/src/assets/img/app-preview.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

- Run `npm install` once you downloaded the repo.
- Go to app directory.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Components

`AppComponent`: The parent component and holds the main app functionality, as it is responsibe to add new chat message to spacific app and bind the new array of chats to child components.

`ChatListComponent`: This component responsible for rendering chat list view (left view of the app) by the object which is passed from parent app and pass events to parent app like showChat when user click on a spacific one to view chat details.

`ChatDetailsComponent`: This component responsible for rendering chat details (right view of the app), it get messages object from parent component (AppComponent) and render it and pass actions to parent component like sendMessage which is responsilbe to add new message (text or image) to current openening app.
