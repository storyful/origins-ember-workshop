function random(min, max){
  return Math.floor(Math.random() * max) + min;
}

function paginate (array, pageSize, pageNumber) {
  --pageNumber;
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

export default function() {

  this.namespace = 'api';
  this.timing = 2000;

  this.passthrough('/assets/**');

  this.get('contents', function(schema, request){
    let page = request.queryParams.page || random(1,10);
    let contents = schema.contents.all();
    contents.models = paginate(contents.models, 10, page);
    return contents;
  });

  this.passthrough();
}
