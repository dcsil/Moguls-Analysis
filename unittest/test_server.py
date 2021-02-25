import unittest

# from .. import app


class ServerTestCase(unittest.TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_add(self):
        self.assertIsNotNone('Success!')


if __name__ == '__main__':
    unittest.main()
