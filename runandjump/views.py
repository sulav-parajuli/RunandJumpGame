from django.shortcuts import render

def runandjump(request):
    return render(request, 'index.html')
