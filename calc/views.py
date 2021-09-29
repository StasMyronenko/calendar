import json
# Create your views here.
from django.shortcuts import render
from django.utils import timezone


def index(request):
    with open('db.json') as f:
        data = json.loads(f.read())
    if request.POST:
        with open('db.json', 'w') as f:

            data[request.POST['date']] = request.POST['count']

            f.write(json.dumps(data, indent=2))
    d_list = []
    for i in data.keys():
        d_list.append(str(i + ' ' + data[i]))

    return render(request, 'index.html', {'data_list': d_list})
