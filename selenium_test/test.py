import unittest,time
from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager
import random
import string

def random_string_gen(n):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=n))

class Test(unittest.TestCase):

    def setUp(self):
        # # Create FF Options Object
        ff_options = webdriver.FirefoxOptions()
        ff_options.set_preference('acceptInsecureCerts', True)
        ff_options.set_preference('browser.cache.disk.enable', False)
        ff_options.set_preference('browser.cache.memory_enable', False)
        ff_options.set_preference('browser.cache.offline.enable', False)
        ff_options.set_preference('browser.cache.check_doc_frequency', 2)
        ff_options.set_preference('network.http.use-cache', False)
        # ff_options.set_preference('browser.cache.memory.capacity', 10000000)
        self.driver = webdriver.Firefox(executable_path="/Users/amr.abdou/.wdm/drivers/geckodriver/macos/v0.29.1/geckodriver",
                                    options=ff_options)
        # setting headless using set_preference('headless',True) doesn't work somehow
        self.driver.get("http://localhost:3000/notepad/jiff")

    def tearDown(self):
        pass
        # self.driver.quit()

    def test_1(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_2(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_3(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_4(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_5(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_6(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_7(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_8(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_9(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)
    def test_10(self):
        textarea = self.driver.find_element_by_id("notepad")
        random_text = random_string_gen(100)
        for c in random_text:
            textarea.send_keys(c)
            time.sleep(.5)