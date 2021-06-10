import time

from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager
import random
import string


def ff_webdriver(url):
    # # Create FF Options Object
    ff_options = webdriver.FirefoxOptions()
    ff_options.set_preference('acceptInsecureCerts', True)
    ff_options.set_preference('browser.cache.disk.enable', False)
    ff_options.set_preference('browser.cache.memory_enable', False)
    ff_options.set_preference('browser.cache.offline.enable', False)
    ff_options.set_preference('browser.cache.check_doc_frequency', 2)
    ff_options.set_preference('network.http.use-cache', False)
    # ff_options.set_preference('browser.cache.memory.capacity', 10000000)
    driver = webdriver.Firefox(executable_path=GeckoDriverManager().install(),
                               options=ff_options)
    # setting headless using set_preference('headless',True) doesn't work somehow
    driver.get(url)
    return driver


def random_string_gen(n):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=n))


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    for i in range(1):
        driver = ff_webdriver("http://localhost:7200/notepad/")
        textarea = driver.find_element_by_id("notepad")
        time.sleep(1)
        textarea.send_keys(random_string_gen(100))
        time.sleep(1)
        textarea.send_keys(random_string_gen(100))
        time.sleep(1)
        driver.get("http://localhost:7200/drawingboard/")
        rectangle = driver.find_element_by_css_selector(
            "div.tool-button:nth-child(2)")
        webdriver.ActionChains(driver).click(rectangle).perform()
        print("Clicked")
        canvas = driver.find_element_by_id("drawingboard")
        webdriver.ActionChains(driver).click_and_hold(canvas).move_by_offset(200,
                                                                             200).release().perform()
        #driver.quit()
