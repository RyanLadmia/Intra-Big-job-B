<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Yaml\Yaml;

class ProfilerToggleService
{
    private ParameterBagInterface $parameterBag;
    private string $cacheDir;
    private string $projectDir;
    private Filesystem $filesystem;

    public function __construct(
        ParameterBagInterface $parameterBag,
        string $cacheDir
    ) {
        $this->parameterBag = $parameterBag;
        $this->cacheDir = $cacheDir;
        $this->projectDir = dirname(dirname($cacheDir));
        $this->filesystem = new Filesystem();
    }

    /**
     * Toggle the profiler on/off
     */
    public function toggleProfiler(bool $enabled, bool $onlyExceptions = true): bool
    {
        $profilerFile = $this->projectDir . '/config/packages/profiler.yaml';
        
        // Convert booleans to string 'true' or 'false' for YAML
        $enabledStr = $enabled ? 'true' : 'false';
        $onlyExceptionsStr = $onlyExceptions ? 'true' : 'false';
        
        $content = <<<YAML
# This file is managed by the ProfilerToggleService
parameters:
    profiler.enabled: {$enabledStr}
    profiler.only_exceptions: {$onlyExceptionsStr}
YAML;

        // Write the file
        $this->filesystem->dumpFile($profilerFile, $content);
        
        // Return success
        return true;
    }

    /**
     * Get current profiler status
     */
    public function getProfilerStatus(): array
    {
        try {
            $enabled = $this->parameterBag->get('profiler.enabled');
        } catch (\Exception $e) {
            $enabled = false;
        }
        
        try {
            $onlyExceptions = $this->parameterBag->get('profiler.only_exceptions');
        } catch (\Exception $e) {
            $onlyExceptions = true;
        }
        
        return [
            'enabled' => $enabled,
            'only_exceptions' => $onlyExceptions
        ];
    }

    /**
     * Clear cache after toggling profiler
     */
    public function clearCache(): bool
    {
        // Simple cache clear - in a real implementation, you might want to use the CacheClearer service
        $filesystem = new Filesystem();
        
        try {
            $filesystem->remove($this->cacheDir . '/pools');
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
} 