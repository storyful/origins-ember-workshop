import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  title(){
    return faker.lorem.sentence(5);
  },

  url(i){
    return faker.image.transport(640, 480, i);
  }

});
