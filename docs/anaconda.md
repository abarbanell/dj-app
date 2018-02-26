# Setup with Anaconda

For data science, you may have anaconda installed on your computer (I am asuuming a Mac here).

Anaconda has its own way of handling environments, here are some useful commands

  # update anaconda itself
  conda update anaconda

  # check which python
  python --version

  # check whether you have activate / deactivate in path
  # should point to ~/anaconda3/bin/activate and ~/anaconda3/bin/deactivate
  which activate 
  which dactivate

  # create new environment with python 3.6.x
  conda create --name p36 python=3.6

  # activate this environment - you may also want this in your .env.rc file
  conda activate p36