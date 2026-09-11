<?php
declare(strict_types=1);

namespace HiAstra\Preview;

use RuntimeException;

// PHP 8.1+: variables, properties, types, attributes, and embedded HTML.
#[\Attribute]
final class Swatch
{
    public const LIMIT = 3;

    /** Build a readable label without changing the palette. */
    public function __construct(
        public readonly string $name,
        public readonly string $color = '#72E0B2',
    ) {}

    public function label(int $index): string
    {
        if ($index < 0) {
            throw new RuntimeException('Invalid index');
        }
        return sprintf('%d / %s', $index, $this->name);
    }
}

$enabled = true;
$options = ['title' => 'HiAstra', 'limit' => Swatch::LIMIT];
$swatches = [new Swatch('Mint'), new Swatch('Blue', '#6FA8FF')];
foreach ($swatches as $index => $swatch) {
    if ($enabled && $index < $options['limit']) {
        echo $swatch->label($index) . "\n";
    }
}
?>
<section class="preview"><?= htmlspecialchars($options['title']) ?></section>
