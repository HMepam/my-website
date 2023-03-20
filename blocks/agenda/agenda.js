function getDateRange(firstDate, lastDate) {
  const dateArray = [];
  const currentDate = new Date(firstDate);

  while (currentDate <= new Date(lastDate)) {
    dateArray.push(`${currentDate.getMonth() + 1}/${currentDate.getDate()}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

function getMinMaxDates(dateArray) {
  // Shuffle the date array
  for (let i = dateArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dateArray[i], dateArray[j]] = [dateArray[j], dateArray[i]];
  }

  // Find the earliest and latest dates
  let minDate = new Date(dateArray[0]);
  let maxDate = new Date(dateArray[0]);

  for (let i = 1; i < dateArray.length; i++) {
    const currentDate = new Date(dateArray[i]);

    if (currentDate < minDate) {
      minDate = currentDate;
    }

    if (currentDate > maxDate) {
      maxDate = currentDate;
    }
  }

  // Format the output dates as 'M/D'
  const minDateString = `${minDate.getMonth() + 1}/${minDate.getDate()}`;
  const maxDateString = `${maxDate.getMonth() + 1}/${maxDate.getDate()}`;

  // Return the earliest and latest dates
  return [minDateString, maxDateString];
}

function createNoScheduleElement(id) {
  const div = document.createElement('div');
  div.className = 'event empty-event';
  div.setAttribute('data-id', id);
  const empty = document.createElement('div');
  empty.className = 'empty';

  const span1 = document.createElement('span');
  span1.textContent = 'Nothing scheduled at this time';
  empty.appendChild(span1);
  const span2 = document.createElement('span');
  span2.textContent = 'New items will appear when scheduled.';

  empty.appendChild(span2);
  div.appendChild(empty);
  return div;
}

function createScheduleElements(id, events) {
  const div = document.createElement('div');
  div.className = 'event';
  div.setAttribute('data-id', id);

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event-item';
    const time = document.createElement('span');
    const description = document.createElement('span');

    time.textContent = event.time;
    description.textContent = event.description;

    eventElement.append(time, description);
    div.appendChild(eventElement);
  });

  return div;
}

function createButtonsFromArray(arr) {
  const div = document.createElement('div');
  div.className = 'date-buttons';

  arr.forEach(date => {
    const button = document.createElement('button');
    button.className = 'date-btn';
    button.textContent = date;
    button.onclick = () => {
      const events = document.getElementsByClassName('event');
      [...events].forEach(event => {
        event.style.display = 'none';
      });
      const elem = document.querySelector(`[data-id="${date}"]`);
      elem.style.display = 'block';
    };
    div.appendChild(button);
  });

  return div;
}

function createEvents(data) {
  const div = document.createElement('div');
  div.className = 'events';

  data.forEach(dateEvent => {
    if (dateEvent.empty) {
      div.appendChild(createNoScheduleElement(dateEvent.date));
    } else {
      div.appendChild(createScheduleElements(dateEvent.date, dateEvent.events));
    }
  });

  return div;
}

function getSortedDataFromBlock(block) {
  const blockCopy = block.cloneNode(true);
  const dates = [...blockCopy.children]?.map(
    row => row?.children[0]?.innerHTML,
  );
  const uniqDates = [...new Set(dates)];
  const fullDates = getDateRange(...getMinMaxDates(uniqDates));

  const data = [];

  fullDates.forEach(date => {
    const blockNodesByDate = [...blockCopy.children].filter(
      row => row?.children[0]?.innerHTML === date,
    );

    if (!blockNodesByDate.length) {
      data.push({ date, empty: true });
    } else {
      const events = [];
      blockNodesByDate.forEach(row => {
        const event = {
          time: '',
          description: '',
          link: '',
        };
        [...row.children].forEach((div, index) => {
          if (index === 1) event.time = div.textContent;
          if (index === 2) event.description = div.textContent;
          if (index === 3) event.link = div.children[0].href;
        });
        events.push(event);
      });
      data.push({ date, events });
    }
  });
  return [data, fullDates];
}

export default function decorate(block) {
  const [data, dates] = getSortedDataFromBlock(block);

  const div = document.createElement('div');
  div.className = 'description';
  const span = document.createElement('span');
  span.textContent = 'Tournament/Media Event Schedule';
  div.appendChild(span);

  const buttons = createButtonsFromArray(dates);
  const events = createEvents(data);

  block.textContent = '';
  block.append(div, buttons, events);
}
