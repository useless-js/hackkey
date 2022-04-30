import Hackkey from './hackkey';

(async () => {
  const store = Hackkey();

  const item1 = store.set({ key: 'nottl', value: { id: 1 } });
  const item2 = store.set({ key: 'ttl', value: { id: 2 }, ttl: 1000 });

  console.log('item1 exists', !!store.get('nottl'));
  console.log('item2 exists', !!store.get('ttl'));

  await new Promise((resolve) =>
    setTimeout(() => {
      console.log('item1 still exists', !!store.get('nottl'));
      console.log('item2 does not exist', !store.get('ttl'));
      return resolve(true);
    }, 1200)
  );

  const item3 = store.set({ key: 'todelete', value: { id: 3 }, ttl: 2000 });
  store.del('todelete');
  console.log('item3 does not exist', !store.get('todelete'));

  const item4 = store.set({ key: 'toupdate', value: { id: 4 }, ttl: 1000 });
  store.udt({ key: 'toupdate', value: { id: 5 }, ttl: 9999999 });

  await new Promise((resolve) =>
    setTimeout(() => {
      console.log('item4 still exists', !!store.get('toupdate'));
      return resolve(true);
    }, 1200)
  );
})();
