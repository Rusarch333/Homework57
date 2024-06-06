'use strict';

const root = document.getElementById('root');

fetch('/assets/js/data.json')
  .then((response) => response.json())
  .then((data) => {
    const h2Actors = createElement(
      'h2',
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
      }); // end of listItems

      const ul = createElement(
        'ul',
        { classNames: ['contact-menu'] },
        ...listItems
      );

      return createElement(
        'figure',
        { classNames: ['actors-container-actor-card'] },
        img,
        figcaption,
        ul
      );
    }); // end of figures

    const divActorsContainer = createElement(
      'div',
      { classNames: ['actors-container'] },
      ...figures
    );

    const h2YouChoosed = createElement(
      'h2',
      { classNames: ['actors-heading', 'actors-you-choosed', 'upper-case'] },
      'You choosed'
    );

    const section = createElement(
      'section',
      { classNames: ['actors'] },
      h2Actors,
      divActorsContainer,
      h2YouChoosed
    );

    root.append(section);
  })
  .catch((error) => {
    root.append('Try again.. error - ', error.message); // 404
  });
