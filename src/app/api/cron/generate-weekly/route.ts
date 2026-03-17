/**
 * Vercel Cron Job - Generates new recipes every Sunday at midnight UTC
 *
 * Configure in vercel.json:
 * "crons": [{
 *   "path": "/api/cron/generate-weekly",
 *   "schedule": "0 0 * * 0"
 * }]
 */

export async function GET(request: Request) {
  try {
    // Verify CRON_SECRET to ensure request is from Vercel
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Call the recipes generation endpoint
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/recipes/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preferences: {
          difficulty: 'medium',
          restrictions: [],
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate recipes: ${response.statusText}`)
    }

    const data = await response.json()

    // Log success
    console.log(`[CRON] Generated ${data.recipes?.length || 0} recipes for the week`)

    return Response.json(
      {
        success: true,
        message: 'Weekly recipes generated successfully',
        recipesCount: data.recipes?.length || 0,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[CRON] Error generating weekly recipes:', error)

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
