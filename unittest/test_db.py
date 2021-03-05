import unittest

# from .. import app


class DatabaseTestCase(unittest.TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_add(self):
        self.assertIsNotNone('Success!')


if __name__ == '__main__':
    unittest.main()
