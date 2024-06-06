'use strict';

const root = document.getElementById('root');

fetch('/assets/js/data.json')
  .then((response) => response.json())
  .then((data) => {
    const h1 = createElement(
      'h1',
      {
        classNames: ['actors-heading', 'upper-case'],
        attributes: { title: 'qwerty', 'data-key': 22 },
      },
      'Actors'
    );

    const figures = data.map((user) => {
      const img = createElement('img', {
        classNames: ['actor-avatar'],
        attributes: { src: user.profilePicture },
        events: {
          error: ({ target }) => {
            target.remove();
          },
        },
      });

      const figcaption = createElement(
        'figcaption',
        { classNames: ['actor-full-name'] },
        user.firstName,
        ' ',
        user.lastName
      );

      const listItems = user.contacts.map((contact) => {
        let contactProvider;

        if (contact.includes('facebook')) {
          contactProvider = 'facebook';
        } else if (contact.includes('instagram')) {
          contactProvider = 'instagram';
        } else {
          contactProvider = 'twitter';
        }

        const a = createElement('a', {
          classNames: ['contact-menu-link', contactProvider],
          attributes: { href: contact },
        });

        return createElement('li', { classNames: ['contact-menu-item'] }, a);
      });
      
      const ul = createElement('ul', { classNames: ['contact-menu'] }, ...listItems);

      return createElement(
        'figure',
        { classNames: ['actors-container-actor-card'] },
        img,
        figcaption,
        ul
      );
    });

    const divActorsContainer = createElement(
      'div',
      { classNames: ['actors-container'] },
      ...figures
    );

    const section = createElement(
      'section',
      { classNames: ['actors'] },
      h1,
      divActorsContainer
    );

    root.append(section);
  })
  .catch((error) => {
    root.append('Try again.. error - ', error.message); // 404
  });
