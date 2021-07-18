import pytest, time

if __name__ == '__main__':
    pytest.main(['-n={}'.format(1), '-v', '--tb=short', '--durations=20','test.py'])