from django.shortcuts import render, redirect
from django.http import HttpResponseNotFound
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
# from main.forms import *

# @login_required(login_url='/authorization/')  # check authenticated
def auth(request):
    """login page"""
    context = {'title': 'Login'}
    
    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/lk')
        else:
            return redirect('login')


    return render(request, 'lk/login.html', context)