import {create, env} from 'sanctuary';

const store = {
  instance: null
};

export const initS = () => {
  if (!store.instance) {
    store.instance = create({
      checkTypes: process.env.NODE_ENV !== 'production',
      env
    });
  }
  return store.instance;
}

export default initS();
