import subprocess
import os
import platform
import threading

def backend(env_path):
    if platform.system() == 'Windows':
        activate_path = os.path.join(env_path, 'Scripts', 'activate')
        subprocess.run(f'"{activate_path}"', shell=True)
    else:
        activate_path = os.path.join(env_path, 'bin', 'activate')
        subprocess.run(f'source "{activate_path}"', shell=True)
    subprocess.run('pip install -r requirements.txt', shell=True, cwd='back')
    subprocess.run('python manage.py makemigrations', shell=True, cwd='back')
    subprocess.run('python manage.py migrate', shell=True, cwd='back')
    subprocess.run('python manage.py runserver 5000', shell=True, cwd='back')


def frontend():
    subprocess.run('npm i', shell=True, cwd='frontend')
    subprocess.run('npm run dev', shell=True, cwd='frontend')

if __name__ == "__main__":
    os_choice = input("Enter 'p' for use 'py' or 'pp' for use 'python' command starter: ").lower()

    if os_choice == 'p':
        python_command = 'py'
    elif os_choice == 'pp':
        python_command = 'python'
    else:
        print("Invalid choice. Exiting.")
        exit()

    # 1st thread
    back = threading.Thread(target=backend, args=('env',))
    front = threading.Thread(target=frontend)
    # Start threads
    back.start()
    front.start()
    # Wait for all threads to finish
    back.join()
    front.join()
    # Start the second set of threads
    back.start()
    front.start()
    # Wait for the second set of threads to finish
    back.join()
    front.join()
