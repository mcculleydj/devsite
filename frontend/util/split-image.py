import argparse
import pathlib
from PIL import Image


def tessellate(path, width, height):
    path = pathlib.Path(path)
    image = Image.open(path)
    image_width, image_height = image.size

    i = 0
    j = 0
    x = 0
    y = 0

    while y + height < image_height:
        while x + width < image_width:
            cropped_image = image.crop((x, y, x+width, y+height))
            cropped_image.save(f'{path.stem}-{i}-{j}{path.suffix}')
            x += width
            j += 1
        x = 0
        j = 0
        y += height
        i += 1
            

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', dest='path', required=True)
    args = parser.parse_args()

    tessellate(args.path, 14.41, 35.56)
